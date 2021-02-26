using CustomCountries.Domain.Models.Country;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace CustomCountries.Domain.Validation
{
    public class CountryValidation : AbstractValidator<Country>
    {
        public CountryValidation()
        {
            RuleFor(x => x.CountryId)
               .NotEmpty()
               .WithMessage("CountryId must not be empty!");

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name must not be empty!");

            RuleFor(x => x.Capital)
                .NotEmpty()
                .WithMessage("Capital must not be empty!");

            RuleFor(x => x.Population)
                .NotEmpty()
                .WithMessage("Population must not be empty!");

            RuleFor(x => x.PopulationDensity)
                .NotEmpty()
                .WithMessage("PopulationDensity must not be empty!");

            RuleFor(x => x.PopulationDensity)
                .NotEmpty()
                .WithMessage("PopulationDensity must not be empty!");

            RuleFor(x => x.TopLevelDomains)
                .NotEmpty()
                .WithMessage("TopLevelDomains must not be empty!");
        }
    }
}
