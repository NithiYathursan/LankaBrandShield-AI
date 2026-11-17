
from psycopg.rows import dict_row

from backend.database import get_connection


def list_brands():
    """Retrieve brands from PostgreSQL."""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                SELECT id, brand_name, official_domain,
                       industry, country_code, logo_path,
                       verification_status, verification_source,
                       created_at, updated_at
                FROM brands
                ORDER BY brand_name, id
                """
            )
            return cursor.fetchall()


def create_brand(brand_name, official_domain, industry=None):
    """Register a brand as pending verification."""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                INSERT INTO brands (
                    brand_name, official_domain, industry,
                    verification_status
                )
                VALUES (%s, %s, %s, 'pending')
                RETURNING id, brand_name, official_domain,
                          industry, verification_status
                """,
                (brand_name, official_domain, industry),
            )
            return cursor.fetchone()
