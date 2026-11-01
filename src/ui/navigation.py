import streamlit as st


def render_sidebar():

    with st.sidebar:

        st.markdown("## 🛡️ LankaBrandShield AI")

        st.caption("Brand Impersonation Screening System")

        st.divider()

        st.markdown("### WORKSPACE")

        selected_page = st.radio(
            "Navigation",
            [
                "🏠 Dashboard",
                "🔗 URL Intelligence",
                "🖼️ Visual Inspection",
                "🕒 Scan History",
                "🏢 Brand Registry",
                "📊 Risk Analytics",
                "⚙️ Settings",
            ],
            label_visibility="collapsed",
        )

        st.divider()

        st.markdown("### SYSTEM STATUS")

        st.success("● Application Running")

        st.caption("Development Version")

        st.divider()

        st.caption("© 2026 LankaBrandShield AI")

    return selected_page