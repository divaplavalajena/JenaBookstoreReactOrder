package business.order;

import java.util.Date;

public record Order(long orderId, int amount, Date dateCreated, long confirmationNumber, long customerId) {}
