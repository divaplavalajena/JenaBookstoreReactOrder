package business.book;

/*
 * TODO: Create a record constructor with fields corresponding to the fields in the
 * book table of your database.
 * Done/Didn't need to DO??? - completed after project 4 during prep for project 5
 */

public record Book(long bookId, String title, String author,
				   int price, boolean isPublic, String description,
				   boolean isFeatured, int rating, String imagePath,
				   long categoryId) {}