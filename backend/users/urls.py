from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, ShelfEntryViewSet

router = DefaultRouter()
router.register(r'profiles', ProfileViewSet, basename='profile')
router.register(r'shelf', ShelfEntryViewSet, basename='shelf')

urlpatterns = router.urls
