
import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv

# Load .env from the project root
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env")


def get_connection():
    """Create a PostgreSQL database connection."""
    return psycopg.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),
        port=int(os.getenv("DB_PORT", "5432")),
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        password=os.environ["DB_PASSWORD"],
        connect_timeout=5,
    )


def check_database_connection():
    """Verify PostgreSQL connectivity."""
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT current_database(), current_user"
            )
            return cursor.fetchone()
