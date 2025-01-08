﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace project3api_be.Models;
[Table("feedback")]
public partial class Feedback
{   
    [Column("feedback_id")]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int FeedbackId { get; set; }
    [Column("full_name")]

    public string FullName { get; set; } = null!;
    [Column("email")]

    public string Email { get; set; } = null!;
    [Column("title")]

    public string Title { get; set; } = null!;
    [Column("content")]

    public string Content { get; set; } = null!;
    [Column("created_at")]

    public DateTime? CreatedAt { get; set; }
}
