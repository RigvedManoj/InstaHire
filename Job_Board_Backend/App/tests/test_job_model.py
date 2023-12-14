from django.test import TestCase
from ..models import Job


class ApplicantTest(TestCase):

    def setUp(self):
        # Set up the model
        Job.objects.create(title='Test_title', company='Test_company', description='Test_description', min_salary=1000,
                           location='Test_location', max_salary=10000, application_deadline='2012-02-20')

    def test_model_fields(self):
        # Get an instance of the model
        job = Job.objects.get(title='Test_title')

        # Check if the fields are set correctly
        self.assertEqual(job.job_id, 1)
        self.assertEqual(job.title, 'Test_title')
        self.assertEqual(job.max_salary, 10000)

    def tearDown(self):
        # Delete the created data
        Job.objects.filter(title='Test_title').delete()
