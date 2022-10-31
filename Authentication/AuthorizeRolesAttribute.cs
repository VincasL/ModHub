using Microsoft.AspNetCore.Authorization;
using ModHub.Enums;

namespace ModHub.Authentication
{
    public class AuthorizeRolesAttribute : AuthorizeAttribute
    {
        public AuthorizeRolesAttribute(params Role[] allowedRoles)
        {
            var allowedRolesAsStrings = allowedRoles.Select(x => ((int)x).ToString()).ToList();
            Roles = string.Join(",", allowedRolesAsStrings);
        }
    }
}