from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Inquiry
from .serializers import InquirySerializer

# For employees: List and create their own inquiries.
class EmployeeInquiryListCreateView(generics.ListCreateAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Employees can only see their own inquiries."""
        return Inquiry.objects.filter(employee=self.request.user)

    def perform_create(self, serializer):
        """Saves inquiry with the authenticated employee as the owner."""
        serializer.save(employee=self.request.user)


# For admins: List all inquiries.
class AdminInquiryListView(generics.ListAPIView):
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        """Admins can see all inquiries, employees are restricted."""
        user = self.request.user
        if user.is_staff:  # ✅ Ensure only staff (admins) can access all inquiries
            return Inquiry.objects.all()
        return Inquiry.objects.none()  # Return empty list if non-admin tries to access


# For admins: Update a specific inquiry (e.g., to answer it).
class AdminInquiryUpdateView(generics.RetrieveUpdateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        """
        Allows admins to update an inquiry and automatically set the status to 'answered' if an answer is provided.
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            if 'answer' in request.data and request.data['answer']:
                instance.status = 'answered'  # ✅ Auto-update status when admin replies
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Allow admin to delete an inquiry
class AdminInquiryDeleteView(generics.DestroyAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.IsAdminUser]  # ✅ Ensure only Admins can delete

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Inquiry deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


