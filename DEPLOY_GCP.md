# GCP Deploy Guide (staging)

Tóm tắt: các bước để CI tự động bật APIs và deploy service lên Cloud Run.

1) Bật Billing
- Login Google Cloud Console → Billing → Link a billing account to the project.

2) Tạo service account & key (local)
- Export và chạy:
  PROJECT_ID=your-project SA_NAME=ci-deploy-sa ./server/scripts/gcp/create_service_account.sh
- Sau khi tạo file key (ci-deploy-sa-key.json): upload nội dung file vào GitHub Secret
  - Secret name: GCP_SA_KEY
  - Add also: GCP_PROJECT secret (value = your project id)
- Xóa file key local: rm -f ci-deploy-sa-key.json

3) Grant roles (if not done by script)
- Required roles:
  - Cloud Run Admin (roles/run.admin)
  - Cloud Build Editor (roles/cloudbuild.builds.editor)
  - Artifact Registry Writer (roles/artifactregistry.writer)
  - Service Account User (roles/iam.serviceAccountUser)

4) Run workflow
- In GitHub Actions → "Deploy → staging (GCP)" → Run workflow
  - Fill project_id and cloud_run_service (service name)
- Or push main (if push trigger enabled)

5) Troubleshooting
- If build fails with permission_denied for Artifact Registry: ensure Billing enabled & Cloud Build SA has artifactregistry.writer.
- Check Cloud Build logs in GCP console.

## Tạo và upload GCP_SA_KEY (chi tiết lệnh)

1) Đăng nhập & chọn project (local machine):
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

2) Tạo service account và key (script giúp tạo sẵn `server/scripts/gcp/create_service_account.sh`):
```bash
PROJECT_ID=your-project SA_NAME=ci-deploy-sa ./server/scripts/gcp/create_service_account.sh
# file key: ci-deploy-sa-key.json
```

3) Upload key vào GitHub Secrets (Unix/macOS):
```bash
# Authenticate gh CLI first: gh auth login
gh secret set GCP_SA_KEY --body "$(cat ci-deploy-sa-key.json)"
gh secret set GCP_PROJECT --body "your-project"
```
PowerShell:
```powershell
gh secret set GCP_SA_KEY --body (Get-Content .\ci-deploy-sa-key.json -Raw)
gh secret set GCP_PROJECT --body "your-project"
```

4) Xóa file key cục bộ khi đã upload:
```bash
rm -f ci-deploy-sa-key.json
```

5) Kiểm tra:
```bash
gh secret list | grep GCP_SA_KEY
```

6) Nếu cần thu hồi hoặc xoá key:
```bash
gcloud iam service-accounts keys list --iam-account=ci-deploy-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
gcloud iam service-accounts keys delete KEY_ID --iam-account=ci-deploy-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com
```

Security notes:
- Không commit file key.
- Xóa file local ngay sau upload và rotate key định kỳ.
