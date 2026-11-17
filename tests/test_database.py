
import os
from unittest.mock import MagicMock, patch

from backend.database import check_database_connection, get_connection


def test_get_connection_uses_environment_variables():
    env = {
        "DB_HOST": "127.0.0.1",
        "DB_PORT": "5432",
        "DB_NAME": "lankabrandshield_db",
        "DB_USER": "lankabrandshield_app",
        "DB_PASSWORD": "test_password",
    }

    with patch.dict(os.environ, env):
        with patch("backend.database.psycopg.connect") as mock_connect:
            get_connection()

    mock_connect.assert_called_once_with(
        host="127.0.0.1",
        port=5432,
        dbname="lankabrandshield_db",
        user="lankabrandshield_app",
        password="test_password",
        connect_timeout=5,
    )


def test_check_database_connection():
    mock_connection = MagicMock()
    mock_cursor = MagicMock()

    mock_connection.__enter__.return_value = mock_connection
    mock_connection.cursor.return_value.__enter__.return_value = mock_cursor

    mock_cursor.fetchone.return_value = (
        "lankabrandshield_db",
        "lankabrandshield_app",
    )

    with patch(
        "backend.database.get_connection",
        return_value=mock_connection,
    ):
        result = check_database_connection()

    assert result == (
        "lankabrandshield_db",
        "lankabrandshield_app",
    )

    mock_cursor.execute.assert_called_once_with(
        "SELECT current_database(), current_user"
    )
