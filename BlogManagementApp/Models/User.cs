using System;
using System.ComponentModel.DataAnnotations;

public class User
{
    
    [Key] public int UserId { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}
