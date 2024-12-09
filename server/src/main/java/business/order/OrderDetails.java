package business.order;

import business.book.Book;
import business.customer.Customer;

import java.util.Collections;
import java.util.List;

public record OrderDetails(Order order, Customer customer,
						   List<LineItem> lineItems, List<Book> books) {}
