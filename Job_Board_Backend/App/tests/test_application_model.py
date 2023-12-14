from django.test import TestCase
from ..models import Job, Employer, Applicant, Application


class ApplicantTest(TestCase):

    def setUp(self):
        # Set up the model
        Applicant.objects.create(username='Test_username', first_name='Test_first_name', last_name='Test_last_name', email='Test@gmail.com',
                                 phone_number=4138291234, gender='Male', dob='2012-02-20', address_line1='This is a sample address',
                                 address_line2='This is a sample address', city='amherst', state='MA', country='US')

        Employer.objects.create(username='Test_username', company_name='Test_company', email='Test@gmail.com',
                                phone_number=4138291234, industry='Test_industry',
                                company_description='This is a sample description')

        Job.objects.create(title='Test_title', company='Test_company', description='Test_description', min_salary=1000,
                           location='Test_location', max_salary=10000, application_deadline='2012-02-20')


    def test_model_fields(self):
        # Get an instance of the model
        applicant = Applicant.objects.get(username='Test_username')
        employer = Employer.objects.get(username='Test_username')
        job = Job.objects.get(title='Test_title')

        #create an application
        application = Application.objects.create(job_id=job, applicant_username=applicant, employer_username=employer)

        # Check if the fields are set correctly
        self.assertEqual(application.job_id, job)
        self.assertEqual(application.applicant_username, applicant)
        self.assertEqual(application.employer_username, employer)

    def tearDown(self):
        # Delete the created data
        applicant = Applicant.objects.get(username='Test_username')
        Application.objects.filter(applicant_username=applicant).delete()
        Applicant.objects.filter(username='Test_username').delete()
        Employer.objects.filter(username='Test_username').delete()
        Job.objects.filter(title='Test_title').delete()
