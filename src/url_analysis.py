from urllib.parse import urlsplit
import ipaddress


def analyze_url(url: str) -> dict:
    """
    Extract basic URL characteristics.

    These indicators do not establish whether
    a website is malicious.
    """

    parsed = urlsplit(url.strip())
    hostname = parsed.hostname

    if (
        parsed.scheme.lower() != "https"
        or not hostname
        or parsed.username is not None
        or parsed.password is not None
    ):
        raise ValueError("A valid HTTPS URL is required.")

    domain = hostname.lower().rstrip(".")

    if not domain:
        raise ValueError("A valid hostname is required.")

    try:
        ipaddress.ip_address(domain)
        is_ip_address = True
    except ValueError:
        is_ip_address = False

    return {
        "domain": domain,
        "domain_length": len(domain),
        "is_ip_address": is_ip_address,
        "hyphen_count": domain.count("-"),
        "subdomain_count": max(0, len(domain.split(".")) - 2),
    }