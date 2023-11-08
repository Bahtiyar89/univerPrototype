from rest_framework.routers import DefaultRouter
from posts.api.urls import post_router
from posts.api.views import FileUpload
from django.urls import path, include

router = DefaultRouter()

# posts
router.registry.extend(post_router.registry)

urlpatterns = [
    path('', include(router.urls)),
    path('upload-file/', FileUpload.as_view(), name='upload-file'),
    
]   


# comments

# texts