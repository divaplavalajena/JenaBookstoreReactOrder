package business.order;

import api.ApiException;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.category.Category;
import business.customer.CustomerForm;

import java.time.DateTimeException;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.logging.Logger;
import java.util.regex.Pattern;

public class DefaultOrderService implements OrderService {
	private static final Logger logger = Logger.getLogger(DefaultOrderService.class.getName());

	private BookDao bookDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}

	@Override
	public OrderDetails getOrderDetails(long orderId) {
		// NOTE: THIS METHOD PROVIDED NEXT PROJECT
		return null;
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		// NOTE: MORE CODE PROVIDED NEXT PROJECT

		return -1;
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
		String address = customerForm.getAddress();
		String phone = customerForm.getPhone();
		String email = customerForm.getEmail();
		String ccNumber = customerForm.getCcNumber();

		if (name == null || name.length() < 4 || name.length() > 45) {
			throw new ApiException.ValidationFailure(name, "Invalid name field");
		}

		if (address == null || address.length() < 4 || address.length() > 45) {
			throw new ApiException.ValidationFailure(address, "Invalid address field");
		}

		if (phone == null || !phoneIsValid(phone)) {
			throw new ApiException.ValidationFailure(phone, "Invalid phone field");
		}

		if (!emailIsValid(email)) {
			throw new ApiException.ValidationFailure(email, "Invalid email field");
		}

		if (!ccNumberIsValid(ccNumber)) {
			throw new ApiException.ValidationFailure(ccNumber,"Invalid ccNumber field");
		}

		// TODO: Validation checks for address, phone, email, ccNumber

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Invalid expiry date");
		}
		logger.info("____ check failed, throwing ___");
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		// TODO: return true when the provided month/year is before the current month/yeaR
		// HINT: Use Integer.parseInt and the YearMonth class
		int expiryYear = Integer.parseInt(ccExpiryYear);
		int expiryMonth = Integer.parseInt(ccExpiryMonth);
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
