namespace Project_sem_03.Backend.Dtos
{
    public class UpdateAccountDto
    {
        public int AccountId { get; set; }
        public string Email { get; set; } = string.Empty;

        public string? Password { get; set; }

        public string? FullName { get; set; }

        public int? RoleId { get; set; }

        public bool? IsActive { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}