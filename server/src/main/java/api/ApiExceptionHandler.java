package api;

import api.ApiException.ValidationFailure;
import jakarta.annotation.Priority;
import jakarta.ws.rs.Priorities;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;


import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Jersey: Manage all validation exceptions that emerge from an API.
 */
@Provider
@Priority(Priorities.USER)
public class ApiExceptionHandler implements
		ExceptionMapper<ApiException> {

	private Logger logger = Logger.getLogger(ApiExceptionHandler.class.getName());

	@Override
	public Response toResponse(ApiException exception) {
		Response.Status status = Response.Status.INTERNAL_SERVER_ERROR;
		if (exception instanceof ValidationFailure) {
			status = Response.Status.BAD_REQUEST;
		}
		return makeResponse(exception, status);
	}

	private Response makeResponse(Exception exception, Response.Status status) {
		try {
			String fieldName = Optional.of(exception)
					.filter(ValidationFailure.class::isInstance)
					.map(ValidationFailure.class::cast)
					.filter(ValidationFailure::isFieldError)
					.map(ValidationFailure::getFieldName)
					.orElse(null);

			ServerErrorResponse serverErrorResponse =
					new ServerErrorResponse(status.getReasonPhrase(),
							exception.getMessage(), fieldName);
			return Response.status(status).entity(serverErrorResponse).type(MediaType.APPLICATION_JSON_TYPE).build();
		} catch (Exception e) {
			logger.log(Level.INFO, e, () -> "Problem attempting to map an Exception to a json response");
			logger.log(Level.INFO, exception, () -> "Original Exception");
			ServerErrorResponse internalErrorResponse =
					new ServerErrorResponse(Response.Status.INTERNAL_SERVER_ERROR.getReasonPhrase(),
					"Problem attempting to map an Exception to a JSON response: "+e.getMessage());
			return Response.serverError().entity(internalErrorResponse).build();
		}
	}
	public record ServerErrorResponse(String reason, String message, String fieldName) {
		public ServerErrorResponse(String reason, String message) {
			this(reason, message, null);
		}

		public boolean getError() {
			return true;
		}
	}

}

