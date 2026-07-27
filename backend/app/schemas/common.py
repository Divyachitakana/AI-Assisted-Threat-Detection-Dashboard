from datetime import datetime
from enum import Enum
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class CamelModel(BaseModel):
    """
    Base for every response/request schema. Serializes field_name ->
    fieldName so the JSON payload matches the frontend's TypeScript
    interfaces (src/types/index.ts) byte-for-byte without the frontend
    needing any field-mapping logic.
    """

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )


class Severity(str, Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"
    info = "info"


class IncidentStatus(str, Enum):
    open = "open"
    investigating = "investigating"
    contained = "contained"
    resolved = "resolved"
    false_positive = "false_positive"


class AlertPriority(str, Enum):
    p1 = "p1"
    p2 = "p2"
    p3 = "p3"
    p4 = "p4"


class DataSourceType(str, Enum):
    cloud_audit_logs = "cloud_audit_logs"
    vpc_flow_logs = "vpc_flow_logs"
    security_command_center = "security_command_center"
    external_threat_intel = "external_threat_intel"


T = TypeVar("T")


class PaginatedResponse(CamelModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    page_size: int


class TimestampedModel(CamelModel):
    pass
