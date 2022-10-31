﻿using ModHub.Enums;

namespace ModHub.DTO;

public class UserDto
{
    public string Email { get; set; }
    public string Username { get; set; }
    public Role Role { get; set; }
}