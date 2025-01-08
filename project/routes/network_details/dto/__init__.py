from pydantic import BaseModel, Field


class NetworkDetails(BaseModel):
    ip_address: str
    subnet_mask_prefix: int = Field(..., ge=1, le=32)
