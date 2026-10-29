<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
	rel="stylesheet">

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
	rel="stylesheet">

<link rel="stylesheet" href="css/createJob.css">

</head>
<body>

	<div class="container py-4">


		<!-- PAGE HEADER -->

		<div class="page-header mb-4">
			<div>
				<h2>
					<i class="bi bi-clipboard-plus"></i> Create New Job
				</h2>
				<p>Create a new production job order</p>
			</div>


			<button type="button" class="btn btn-outline-secondary"
				onclick="goBackToDashboard()">

				<i class="bi bi-arrow-left"></i> Back to Dashboard

			</button>
		</div>



		<!-- ALERT -->
		<div id="jobAlert" class="alert d-none" role="alert"></div>



		<!-- CREATE JOB CARD -->

		<div class="card shadow-sm">

			<div class="card-header">

				<h5 class="mb-0">

					<i class="bi bi-file-earmark-plus"></i> Job Order Details

				</h5>

			</div>


			<div class="card-body">


				<form id="createJobForm">


					<div class="row g-3">


						<!-- CUSTOMER -->
						<div class="col-12">

							<label for="customer_id" class="form-label"> Customer <span
								class="text-danger">*</span>
							</label> <select id="customer_id" class="form-select" required>

								<option value="">Loading customers...</option>

							</select>

						</div>


						<!-- PART NAME -->

						<div class="col-md-6">

							<label for="part_name" class="form-label"> Part Name <span
								class="text-danger">*</span>
							</label> <input type="text" id="part_name" name="part_name"
								class="form-control" maxlength="100"
								placeholder="Enter part name" required>
						</div>





						<!-- QUANTITY -->

						<div class="col-md-6">

							<label for="quantity" class="form-label"> Quantity <span
								class="text-danger">*</span>
							</label> <input type="number" id="quantity" name="quantity"
								class="form-control" min="1" placeholder="Enter quantity"
								required>
						</div>



						<!-- MATERIAL -->

						<div class="col-md-6">

							<label for="material" class="form-label"> Material </label> <input
								type="text" id="material" name="material" class="form-control"
								maxlength="100" placeholder="Example: Steel">
						</div>



						<!-- DESIGN FILE -->

						<div class="col-md-6">
							<label for="design_file" class="form-label"> Design File
							</label> <input type="text" id="design_file" name="design_file"
								class="form-control" maxlength="255"
								placeholder="Enter design file name/path">

							<div class="form-text">Example: gear_design.pdf</div>
						</div>



						<!-- STATUS -->

						<div class="col-md-6">
							<label for="status" class="form-label"> Initial Status </label> <select
								id="status" name="status" class="form-select">
								<option value="Pending" selected>Pending</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>



						<!-- INFORMATION -->

						<div class="col-12">
							<div class="job-info-box">
								<i class="bi bi-info-circle"></i>

								<div>
									<strong>Worker & Machine</strong>
									<p class="mb-0">Worker and machine will be assigned after
										the job is created.</p>
								</div>
							</div>
						</div>
					</div>



					<!-- BUTTONS -->

					<div class="form-actions mt-4">

						<button type="submit" id="createJobButton" class="btn btn-primary">
							<i class="bi bi-check-circle"></i> Create Job
						</button>


						<button type="button" class="btn btn-secondary"
							onclick="resetCreateJobForm()">
							<i class="bi bi-arrow-counterclockwise"></i> Reset
						</button>


						<button type="button" class="btn btn-outline-secondary"
							onclick="goBackToDashboard()">
							<i class="bi bi-x-circle"></i> Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
     <script src="javascript/apiconfig.js"></script>
	<script src="javascript/createJob.js"></script>
</body>
</html>