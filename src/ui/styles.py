import streamlit as st


def apply_custom_styles():
    st.markdown(
        """
        <style>
        .stApp {
            background-color: #0B1120;
            color: #E2E8F0;
        }

        .block-container {
            max-width: 1400px;
            padding-top: 2rem;
            padding-bottom: 3rem;
        }

        [data-testid="stSidebar"] {
            background-color: #111827;
            border-right: 1px solid #263244;
        }

        h1, h2, h3 {
            color: #F8FAFC;
            letter-spacing: -0.5px;
        }

        .stButton > button {
            background-color: #0891B2;
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            padding: 0.65rem 1.2rem;
            font-weight: 600;
        }

        .stButton > button:hover {
            background-color: #0E7490;
            color: #FFFFFF;
        }

        .stTextInput input {
            background-color: #162033;
            color: #F8FAFC;
            border-radius: 10px;
        }

        [data-testid="stFileUploader"] {
            background-color: #162033;
            border: 1px solid #334155;
            border-radius: 14px;
            padding: 1rem;
        }

        [data-testid="stMetric"] {
            background-color: #162033;
            border: 1px solid #263244;
            border-radius: 14px;
            padding: 1rem;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )