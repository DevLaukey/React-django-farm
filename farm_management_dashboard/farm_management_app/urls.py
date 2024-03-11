from django.urls import path, include
from rest_framework import routers
from .views import CropViewSet, EmployeeViewSet, LivestockViewSet, MachineryViewSet, UserRegistrationView, IncomeViewSet, ExpenditureViewSet, IncomeCreateView, ExpenditureCreateView

router = routers.DefaultRouter()
router.register(r'crops', CropViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'livestocks', LivestockViewSet)
router.register(r'machinery', MachineryViewSet)
router.register(r'income', IncomeViewSet)
router.register(r'expenditure', ExpenditureViewSet)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('income/create/', IncomeCreateView.as_view(), name='income-create'),
    path('expenditure/create/', ExpenditureCreateView.as_view(), name='expenditure-create'),
    path('', include(router.urls)),
]
