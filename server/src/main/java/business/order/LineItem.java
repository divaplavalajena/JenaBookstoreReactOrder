package business.order;

public record LineItem(long bookId, long orderId, int quantity) {}
