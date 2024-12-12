package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.Year;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.logging.Logger;
import java.util.regex.Pattern;

public class DefaultOrderService implements OrderService {
	private static final Logger logger = Logger.getLogger(DefaultOrderService.class.getName());

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao) { this.orderDao = orderDao; }
	public void setLineItemDao(LineItemDao lineItemDao) { this.lineItemDao = lineItemDao; }
	public void setCustomerDao(CustomerDao customerDao) { this.customerDao = customerDao; }

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private Date getCardExpirationDate(String monthString, String yearString) {
		int expiryYear = Integer.parseInt(yearString);
		int expiryMonth = Integer.parseInt(monthString);
		Calendar calendar = Calendar.getInstance();
		calendar.clear();
		calendar.set(Calendar.MONTH, expiryMonth - 1); // months are counted from 0 not 1
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		calendar.set(Calendar.YEAR, expiryYear);
		Date date = calendar.getTime();
		return date; //new Date(); // DONE Implement this correctly
	}

	private long performPlaceOrderTransaction(
			String name, String address, String phone,
			String email, String ccNumber, Date date,
			ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				lineItemDao.create(connection, customerOrderId,
						item.getBookId(), item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}

	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();
		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();

		if (name == null || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure("name", "Invalid name field");
		}

		if (address == null || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure("address", "Invalid address field");
		}

		if (phone == null || !phoneIsValid(phone)) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone field");
		}

		if (!emailIsValid(email)) {
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}

		if (!ccNumberIsValid(ccNumber)) {
			throw new ApiException.ValidationFailure("ccNumber","Invalid ccNumber field");
		}

		// DONE Validation checks for address, phone, email, ccNumber
		if (!expiryDateIsValid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");
		}
	}

	private boolean expiryDateIsValid(String ccExpiryMonth, String ccExpiryYear) {
		// DONE return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		int expiryYear = 0;
		int expiryMonth = 0;
		try {
			expiryYear = Integer.parseInt(ccExpiryYear);
			expiryMonth = Integer.parseInt(ccExpiryMonth);
		} catch (NumberFormatException e) {
			return false;
		}
		if (expiryMonth <=1 || expiryMonth >= 12) {
			return false;
		}
		YearMonth yearMonth = YearMonth.of(expiryYear, expiryMonth);
        return !yearMonth.isBefore(YearMonth.now());
	}

	private boolean phoneIsValid(String phone) {
		// from https://stackoverflow.com/questions/25089362/remove-parentheses-dashes-and-spaces-from-phone-number
		String phoneStripped = phone.replaceAll("[^0-9]", "");
		return phoneStripped.length() == 10;
	}

	private boolean emailIsValid(String email) {
		// from https://www.geeksforgeeks.org/check-email-address-valid-not-java/
		// Regular expression to match valid email formats
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
				"(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

		// Compile the regex
		Pattern p = Pattern.compile(emailRegex);

		// Check if email matches the pattern
		return email != null && p.matcher(email).matches();
	}

	private boolean ccNumberIsValid(String ccNumber) {
		if (ccNumber == null) {
			return false;
		}
		String ccNumberStripped = ccNumber.replaceAll("\\D", "");
		return ccNumberStripped.length() >= 14 || ccNumberStripped.length() <= 16;
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 1 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());
			if (databaseBook.price() != item.getBookPrice()) {
				throw new ApiException.ValidationFailure("Invalid price");
			}
			if (databaseBook.categoryId() != item.getCategoryId()) {
				throw new ApiException.ValidationFailure("Invalid category");
			}
			//  complete the required validations - DONE
		});
	}

}
