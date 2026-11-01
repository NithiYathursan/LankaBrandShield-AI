import streamlit as st
from PIL import Image, UnidentifiedImageError
from src.url_analysis import analyze_url
from src.image_preprocessing import preprocess_image
from src.ui.styles import apply_custom_styles
from src.ui.navigation import render_sidebar
# ---------------------------------------
# Application Configuration
# ---------------------------------------

st.set_page_config(
    page_title="LankaBrandShield AI",
    page_icon="🛡️",
    layout="wide"
)

apply_custom_styles()
selected_page = render_sidebar()
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
        image.load()

        st.subheader("Original Screenshot")

        st.image(
            image,
            caption="Original Website Screenshot",
            use_container_width=True
        )

        st.write("Original Width:", image.width)
        st.write("Original Height:", image.height)
        st.write("Original Color Mode:", image.mode)

        # Preprocess screenshot
        processed_image = preprocess_image(image)

        st.subheader("Preprocessed Screenshot")

        st.image(
            processed_image,
            caption="Preprocessed Website Screenshot",
            use_container_width=True
        )

        st.success("Image preprocessing completed successfully.")

        st.write("Processed Width:", processed_image.width)
        st.write("Processed Height:", processed_image.height)
        st.write("Processed Color Mode:", processed_image.mode)

        st.info(
            "Image preprocessing prepares screenshots for future "
            "OCR and computer vision analysis. "
            "It does not detect phishing websites."
        )

    except (UnidentifiedImageError, OSError, ValueError):
        st.error(
            "Unable to process this image. "
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
            result = analyze_url(website_url)

            st.success("URL analysis completed successfully.")

            st.write("**Extracted Domain:**", result["domain"])
            st.write("**Domain Length:**", result["domain_length"])
            st.write("**IP Address:**", result["is_ip_address"])
            st.write("**Hyphen Count:**", result["hyphen_count"])
            st.write("**Subdomain Count:**", result["subdomain_count"])

            st.info(
                "These are basic URL characteristics. "
                "They do not confirm whether a website is safe or malicious."
            )

        except ValueError:
            st.error("Invalid or unsupported URL. Enter a complete HTTPS URL.")

# ---------------------------------------
# Disclaimer
# ---------------------------------------

st.divider()

st.caption(
    "LankaBrandShield AI is a research prototype. "
    "A screenshot or URL analysis cannot independently "
    "confirm that a website is safe."
)