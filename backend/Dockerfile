# ############################################################################
# STAGE 1: BUILDER
# We use this stage to compile binary-heavy Python libs (NumPy, Shapely, etc.)
# ############################################################################
FROM python:3.13-slim AS builder

WORKDIR /app

# Install build tools needed for libraries like Shapely, PyArrow, etc.
# We include build-essential for GCC
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Create a virtual environment to isolate packages
RUN python -m venv /opt/venv
# Enable venv for the build process
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

# Install dependencies into the virtual environment
RUN pip install --no-cache-dir -r requirements.txt

# ############################################################################
# STAGE 2: RUNTIME
# This is the actual image that gets deployed. No GCC, no caches.
# ############################################################################
FROM python:3.13-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH"

# INSTALL SYSTEM DEPENDENCIES
# 1. --no-install-recommends: CRITICAL. Prevents installing X11/GNOME UI for LibreOffice.
# 2. default-jre-headless: Installs Java without graphics/sound support.
# 3. libreoffice-writer: Needed for your doc processing.
# 4. libpq-5: Runtime library for database connections.
RUN apt-get update && apt-get install -y --no-install-recommends \
    default-jre-headless \
    libreoffice-writer \
    fonts-crosextra-carlito \
    libpq-5 \
    && rm -rf /var/lib/apt/lists/*

# COPY GENERATED VIRTUAL ENV FROM BUILDER
COPY --from=builder /opt/venv /opt/venv

# COPY APPLICATION CODE
COPY . .

# Run as non-root user (Security Best Practice - optional but recommended)
# RUN useradd -m appuser && chown -R appuser /app
# USER appuser

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]