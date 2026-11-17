
-- LankaBrandShield AI
-- Migration 001: Create brand registry

CREATE TABLE IF NOT EXISTS brands (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand_name VARCHAR(150) NOT NULL,
    official_domain VARCHAR(255) NOT NULL UNIQUE,
    industry VARCHAR(100),
    country_code CHAR(2) NOT NULL DEFAULT 'LK',
    logo_path TEXT,
    verification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    verification_source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_verification_status
        CHECK (
            verification_status IN (
                'pending',
                'verified',
                'rejected'
            )
        )
);
