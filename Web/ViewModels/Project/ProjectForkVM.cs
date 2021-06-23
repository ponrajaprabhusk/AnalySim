﻿using System.ComponentModel.DataAnnotations;

namespace Web.ViewModels.Project
{
    public class ProjectForkVM
    {
        [Required(ErrorMessage = "User ID is a required field.")]
        public int UserID { get; set; }

        [Required(ErrorMessage = "Project ID is a required field.")]
        public int ProjectID { get; set; }
    }
}
