from fastapi import APIRouter, Query, Path

from project import router_v1
from fastapi.responses import JSONResponse
from project.routes.network_details.dto import NetworkDetails
from project.utils import NetworkService
from project.utils.NetworkService import IPConverter

network_router = APIRouter(prefix="/network", tags=["Network"])


@network_router.post("/details/")
async def network_details_endpoint(network_data: NetworkDetails):
    ip_converter = IPConverter()
    subnet_mask = await ip_converter.prefix_to_mask_ip(network_data.subnet_mask_prefix)

    network_service = NetworkService(ip=network_data.ip_address, subnet_mask=subnet_mask)

    network_ip = await network_service.get_network_address()
    network_hosts = await network_service.get_hosts()
    network_broadcast = await network_service.get_broadcast_address()

    ip_class = await network_service.get_ip_class()
    ip_status = await network_service.get_ip_status()

    return JSONResponse(status_code=200, content={
        "ip": {
            "address": network_data.ip_address,
            "ip_class": ip_class,
            "ip_status": ip_status,
        },
        "network": {
            "ip": network_ip,
            "hosts": network_hosts,
            "broadcast": network_broadcast,
            "subnets": 2 ** (32 - network_data.subnet_mask_prefix)
        },
        "subnet_mask": subnet_mask,
    })


@network_router.get("/ip/bin/{ip_address}/")
async def ip_to_binary_endpoint(ip_address: str):
    ip_converter = IPConverter()
    ip_bin = await ip_converter.ip_to_binary(ip_address)

    return JSONResponse(status_code=200, content={
        "ip_address_binary": ip_bin,
    })


@network_router.get("/ip/dec/{ip_address_bin}/")
async def binary_ip_to_dec_endpoint(ip_address_bin: str):
    ip_converter = IPConverter()
    ip_address = await ip_converter.binary_to_ip(ip_address_bin)

    return JSONResponse(status_code=200, content={
        "ip_address": ip_address,
    })


@network_router.get("/mask/prefix/{prefix}/")
async def mask_to_cidr_endpoint(prefix: int = Path(..., ge=1, le=32)):
    ip_converter = IPConverter()
    ip_mask = await ip_converter.prefix_to_mask_ip(prefix)

    return JSONResponse(status_code=200, content={
        "ip_mask": ip_mask,
    })


@network_router.get("/mask/ip/{mask_ip}/")
async def mask_to_cidr_endpoint(mask_ip: str):
    ip_converter = IPConverter()
    ip_mask = await ip_converter.mask_ip_to_prefix(mask_ip)

    return JSONResponse(status_code=200, content={
        "ip_mask": ip_mask,
    })


router_v1.include_router(network_router)
