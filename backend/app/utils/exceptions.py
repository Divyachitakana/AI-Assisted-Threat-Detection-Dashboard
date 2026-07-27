class NotFoundError(Exception):
    """Raised by services/repositories when a requested record doesn't exist.

    Routers catch this and translate it to a 404 — keeps the service layer
    free of any FastAPI/HTTP-specific concerns (clean architecture: services
    shouldn't know they're being called over HTTP).
    """

    def __init__(self, resource: str, identifier: str) -> None:
        self.resource = resource
        self.identifier = identifier
        super().__init__(f"{resource} '{identifier}' not found")
