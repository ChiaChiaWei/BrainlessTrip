using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(BrainlessTripMVC.Startup))]
namespace BrainlessTripMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
