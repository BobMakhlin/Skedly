
## Technical stack

- Java 17
- Spring Boot 3.x
- Hibernate
- Flyway
- MySQL 9.3.0
- Kubernetes
- Angular 19
- Material

## Next steps

If the project grows to include more services and dependencies

1. Helm releases: Migrate to a Helm-based setup using an umbrella chart with library subcharts. Also, consider extracting common templating logic into custom Helm libraries.
2. Use Secrets: In our K8S cluster we should use secrets. Ideally, generate random passwords in secrets on every deployment.
3. Use Managed Services: MySQL provided by the cloud instead of placing them in K8S cluster. This, of course, changes the way we provision it.
4. Use Swagger Codegen: Instead of defining API endpoints, models, etc, we can use a swagger codegen project, allowing us to maintain openapi.yaml that is easily converted into java classes via the codegen plugin.
5. Snackbars: Consider adding snackbars in order to identify API operation results, leading to better UX.

## Known issues

Switching timezone via the header input in real time, sometimes leads to inconsistent datetime conversions in mat-datetimepickers.
Consider using moment and appropriate adapter instead of relying on JS-native Dates and luxons conversions under the hood.

