module "service_account_adminmanagement-service" {
  source       = "./modules/service_account"
  account_id   = "adminmanagement-service"
  display_name = "Admin Management Service Account"
  project_id   = "intricate-pad-455413-f7"
  roles        = [
    "roles/cloudsql.client",
    "roles/storage.objectViewer",
    "roles/secretmanager.secretAccessor"
  ]
}