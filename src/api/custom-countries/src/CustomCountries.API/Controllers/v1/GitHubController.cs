using CustomCountries.Application.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CustomCountries.API.Controllers.v1
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/v1/github")]
    public class GithubController : ControllerBase
    {
        private readonly IGithubService _githubService;

        public GithubController(IGithubService githubService)
        {
            _githubService = githubService;
        }

        /// <summary>
        /// Get Link Github Repository
        /// </summary>        
        /// <returns>Get Link Github Repository</returns>
        /// <response code="200">Return link</response>
        /// <response code="404">Not found</response>       
        /// <response code="500">Internal server error</response> 
        [HttpGet]
        public ActionResult<string> Get()
        {
            var link = _githubService.GetLinkRepo();

            return Ok(link);
        }
    }
}
