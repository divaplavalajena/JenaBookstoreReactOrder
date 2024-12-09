
package business;

import business.book.BookDao;
import business.book.BookDaoJdbc;
import business.category.CategoryDao;
import business.category.CategoryDaoJdbc;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.order.*;

public class ApplicationContext {

    private CategoryDao categoryDao;
    private BookDao bookDao;
    private OrderService orderService;
    private OrderDao orderDao;
    private LineItemDao lineItemDao;
    private CustomerDao customerDao;

    public static ApplicationContext INSTANCE = new ApplicationContext();

    private ApplicationContext() {
        categoryDao = new CategoryDaoJdbc();
        bookDao = new BookDaoJdbc();
        customerDao = new CustomerDaoJdbc();
        orderDao = new OrderDaoJdbc();
        lineItemDao = new LineItemDaoJdbc();
        orderService = new DefaultOrderService();
        ((DefaultOrderService)orderService).setBookDao(bookDao);
        ((DefaultOrderService)orderService).setCustomerDao(customerDao);
        ((DefaultOrderService)orderService).setLineItemDao(lineItemDao);
        ((DefaultOrderService)orderService).setOrderDao(orderDao);
    }

    public CategoryDao getCategoryDao() {
        return categoryDao;
    }

    public BookDao getBookDao() { return bookDao; }

    public OrderService getOrderService() { return orderService; }

    public OrderDao getOrderDao() { return orderDao; }

    public LineItemDao getLineItemDao() { return lineItemDao; }

    public CustomerDao getCustomerDao() { return customerDao; }
}
