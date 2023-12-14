from django.test import TestCase
from ..models import Applicant


class ApplicantTest(TestCase):

    def setUp(self):
        # Set up the model
        Applicant.objects.create(username='Test_username', first_name='Test_first_name', last_name='Test_last_name', email='Test@gmail.com',
                                phone_number=4138291234, gender='Male', dob='2012-02-20', address_line1='This is a sample address',
                                 address_line2='This is a sample address', city='amherst', state='MA', country='US')

    def test_model_fields(self):
        # Get an instance of the model
        applicant = Applicant.objects.get(username='Test_username')

        # Check if the fields are set correctly
        self.assertEqual(applicant.username, 'Test_username')
        self.assertEqual(applicant.first_name, 'Test_first_name')
        self.assertEqual(applicant.phone_number, '4138291234')
        self.assertEqual(applicant.address_line2, 'This is a sample address')

    def tearDown(self):
        # Delete the created data
        Applicant.objects.filter(username='Test_username').delete()
