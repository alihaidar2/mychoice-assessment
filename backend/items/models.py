from django.db import models

# Create your models here.
class Item(models.Model):
    class Group(models.TextChoices):
        PRIMARY = "Primary", "Primary"
        SECONDARY = "Secondary", "Secondary"

    name = models.CharField(max_length=100)
    group = models.CharField(max_length=10, choices=Group.choices)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "group"], name="uniq_name_in_group"
            )
        ]

    def __str__(self):
        return f"{self.name} ({self.group})"
