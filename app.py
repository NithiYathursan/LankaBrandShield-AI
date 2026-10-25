import streamlit as st

from PIL import Image, UnidentifiedImageError
from urllib.parse import urlsplit


# ---------------------------------------
# Application Configuration
# ---------------------------------------

st.set_page_config(
    page_title="LankaBrandShield AI",
    page_icon="🛡️",
    layout="wide"
)


# ---------------------------------------
# Application Header
# ---------------------------------------

st.title("🛡️ LankaBrandShield AI")

st.subheader(
    "Visual Brand Impersonation Research Prototype"
)

st.write(
    "A Sri Lanka-focused project for analyzing "
    "website screenshots and URL information."
)

st.info(
    "Current version: Initial prototype. "
    "AI-based phishing detection is not yet implemented."
)


# ---------------------------------------
# Screenshot Upload
# ---------------------------------------

st.header("1. Upload Website Screenshot")

uploaded_file = st.file_uploader(
    "Select a website screenshot",
    type=["png", "jpg", "jpeg"]
)

if uploaded_file is not None:

    try:
        image = Image.open(uploaded_file)

        st.image(
            image,
            caption="Uploaded Website Screenshot",
            use_container_width=True
        )

        st.success("Screenshot loaded successfully.")

        st.write("Image width:", image.width)
        st.write("Image height:", image.height)

    except (UnidentifiedImageError, OSError):

        st.error(
            "Unable to open this image. "
            "Please upload a valid PNG or JPEG file."
        )


# ---------------------------------------
# URL Inspection
# ---------------------------------------

st.header("2. Website URL Inspection")

website_url = st.text_input(
    "Enter the website URL",
    placeholder="https://example.com"
)


if st.button("Analyze URL"):

    if not website_url.strip():

        st.warning("Please enter a website URL.")

    else:

        try:
            url = website_url.strip()

            parsed_url = urlsplit(url)

            hostname = parsed_url.hostname

            if (
                parsed_url.scheme.lower() != "https"
                or not hostname
                or parsed_url.username is not None
                or parsed_url.password is not None
            ):

                st.warning(
                    "Invalid or unsupported URL. "
                    "Enter a complete HTTPS URL."
                )

            else:

                domain = hostname.lower().rstrip(".")

                st.write("Extracted Domain:", domain)

                st.info(
                    "URL parsing completed. "
                    "Brand verification and AI analysis "
                    "will be developed in later stages."
                )

        except ValueError:

            st.error("The URL could not be parsed.")


# ---------------------------------------
# Disclaimer
# ---------------------------------------

st.divider()

st.caption(
    "LankaBrandShield AI is a research prototype. "
    "A screenshot or URL analysis cannot independently "
    "confirm that a website is safe."
)