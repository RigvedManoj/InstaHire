from django.test import TestCase
from ..models import Employer


class EmployerTest(TestCase):

    def setUp(self):
        # Set up the model
        Employer.objects.create(username='Test_username', company_name='Test_company_name', email='Test@gmail.com',
                                phone_number=4138291234, industry='Test_industry',
                                company_description='This is a sample description')

    def test_model_fields(self):
        # Get an instance of the model
        employer = Employer.objects.get(username='Test_username')

        # Check if the fields are set correctly
        self.assertEqual(employer.username, 'Test_username')
        self.assertEqual(employer.company_name, 'Test_company_name')
        self.assertEqual(employer.phone_number, '4138291234')
        self.assertEqual(employer.company_description, 'This is a sample description')

    def tearDown(self):
        # Delete the created data
        Employer.objects.filter(username='Test_username').delete()
