#!/bin/bash
# Deploy script for IVS Celestech
# Usage: ./deploy.sh [frontend|backend|all]

set -e

ENVIRONMENT=${1:-all}
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "🚀 IVS Celestech Deployment Script"
echo "=================================="
echo "Environment: $ENVIRONMENT"
echo "Timestamp: $TIMESTAMP"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Check prerequisites
check_prerequisites() {
    echo ""
    echo "📋 Checking prerequisites..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git not found. Please install Git."
        exit 1
    fi
    print_status "Git installed"
    
    if [ "$ENVIRONMENT" = "backend" ] || [ "$ENVIRONMENT" = "all" ]; then
        if ! command -v npm &> /dev/null; then
            print_error "npm not found. Please install Node.js."
            exit 1
        fi
        print_status "npm installed"
    fi
    
    if [ "$ENVIRONMENT" = "backend" ] || [ "$ENVIRONMENT" = "all" ]; then
        if [ ! -f "server/.env" ]; then
            print_error "server/.env not found. Please create it from .env.example"
            exit 1
        fi
        print_status "server/.env exists"
    fi
}

# Deploy frontend
deploy_frontend() {
    echo ""
    echo "📦 Deploying Frontend (GitHub Pages)..."
    
    # Check if there are changes
    if [ -z "$(git status --porcelain)" ]; then
        print_warning "No changes to commit"
        return
    fi
    
    # Commit changes
    git add Pages/ivs-celestech/
    git add lang/
    git add DEPLOY_CELESTECH.md
    git add CELESTECH_QUICKSTART.md
    git add DEPLOY_CHECKLIST.md 2>/dev/null || true
    git add deploy.sh 2>/dev/null || true
    
    git commit -m "Deploy Celestech - $TIMESTAMP"
    
    print_status "Code committed"
    
    # Push to GitHub
    git push origin main
    print_status "Code pushed to GitHub"
    
    echo ""
    echo "⏳ GitHub Pages deployment in progress..."
    echo "   Check https://github.com/ivsacademy/ivs.github.io/actions"
    echo ""
    print_status "Frontend deployment initiated"
}

# Deploy backend
deploy_backend() {
    echo ""
    echo "🔧 Deploying Backend..."
    
    if [ ! -d "server" ]; then
        print_error "server directory not found"
        exit 1
    fi
    
    cd server
    
    # Check Node version
    NODE_VERSION=$(node -v)
    print_status "Node.js version: $NODE_VERSION"
    
    # Install dependencies
    print_status "Installing dependencies..."
    npm install --production
    
    # Build if needed
    if [ -f "package.json" ] && grep -q "\"build\"" package.json; then
        print_status "Building application..."
        npm run build
    fi
    
    # Check for Cloud Run deployment
    if command -v gcloud &> /dev/null; then
        echo ""
        echo "📌 Deploying to Google Cloud Run..."
        
        if [ ! -f "firebase-key.json" ]; then
            print_warning "firebase-key.json not found. Skipping GCP deployment."
            echo "   To deploy to Cloud Run, download Firebase Admin SDK key and place in server/firebase-key.json"
        else
            FIREBASE_KEY=$(cat firebase-key.json | base64 | tr -d '\n')
            
            gcloud run deploy ivs-celestech-server \
              --source . \
              --platform managed \
              --region us-central1 \
              --set-env-vars FIREBASE_ADMIN_SDK_KEY="$FIREBASE_KEY" \
              --allow-unauthenticated \
              --quiet
            
            print_status "Backend deployed to Cloud Run"
            
            # Get service URL
            SERVICE_URL=$(gcloud run services describe ivs-celestech-server --platform managed --region us-central1 --format 'value(status.url)')
            echo ""
            echo "🌐 Service URL: $SERVICE_URL"
        fi
    else
        print_warning "gcloud CLI not found. Cannot deploy to Cloud Run."
        echo "   To deploy manually:"
        echo "   1. gcloud auth login"
        echo "   2. gcloud config set project ivs-159a7"
        echo "   3. gcloud run deploy ivs-celestech-server --source ."
    fi
    
    cd ..
    print_status "Backend deployment completed"
}

# Test deployment
test_deployment() {
    echo ""
    echo "🧪 Testing deployment..."
    
    if [ "$ENVIRONMENT" = "backend" ] || [ "$ENVIRONMENT" = "all" ]; then
        if [ -z "$SERVICE_URL" ]; then
            SERVICE_URL=$(gcloud run services describe ivs-celestech-server --platform managed --region us-central1 --format 'value(status.url)' 2>/dev/null || echo "http://localhost:3000")
        fi
        
        echo "Testing API endpoint: $SERVICE_URL/api/celestech/requests"
        
        # Simple health check (will fail without auth, but should be 401 not 404)
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SERVICE_URL/api/celestech/requests")
        
        if [ "$HTTP_CODE" = "401" ] || [ "$HTTP_CODE" = "200" ]; then
            print_status "API endpoint responding"
        else
            print_warning "API endpoint returned HTTP $HTTP_CODE"
        fi
    fi
}

# Main execution
main() {
    check_prerequisites
    
    case $ENVIRONMENT in
        frontend)
            deploy_frontend
            ;;
        backend)
            deploy_backend
            test_deployment
            ;;
        all)
            deploy_frontend
            deploy_backend
            test_deployment
            ;;
        *)
            print_error "Invalid environment: $ENVIRONMENT"
            echo "Usage: ./deploy.sh [frontend|backend|all]"
            exit 1
            ;;
    esac
    
    echo ""
    echo "✅ Deployment completed!"
    echo ""
    print_status "Frontend: https://ivsacademy.edu.vn/Pages/ivs-celestech/"
    
    if [ "$ENVIRONMENT" = "backend" ] || [ "$ENVIRONMENT" = "all" ]; then
        echo "🔧 Backend: Update config.json with your server URL"
    fi
    
    echo ""
    print_status "Next steps:"
    echo "   1. Test the application in your browser"
    echo "   2. Verify Firebase integration"
    echo "   3. Check logs for any errors"
    echo "   4. Monitor usage and performance"
}

main
