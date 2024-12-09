package business.customer;

import java.util.Date;

public record Customer(long customerId, String customerName, String address, String phone, String email,
					   String ccNumber, Date ccExpDate) {
}
