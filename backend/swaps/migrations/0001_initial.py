# Generated by Django 4.2.19 on 2025-03-28 05:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('shifts', '0003_alter_shift_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='SwapShiftRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('approved', 'Approved'), ('denied', 'Denied')], default='pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('desired_shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='swap_desired_requests', to='shifts.shift')),
                ('give_up_shift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='swap_given_requests', to='shifts.shift')),
                ('requested_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='swap_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
