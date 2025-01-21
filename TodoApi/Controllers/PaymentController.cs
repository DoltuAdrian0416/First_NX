// Controllers/PaymentsController.cs
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.Threading.Tasks;

namespace TodoApi.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class PaymentsController : ControllerBase
  {
    [HttpPost("create-payment-intent")]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] CreatePaymentIntentRequest request)
    {
      var options = new PaymentIntentCreateOptions
      {
        Amount = request.Amount,
        Currency = "usd",
        PaymentMethodTypes = new List<string> { "card" },
      };
      var service = new PaymentIntentService();
      var paymentIntent = await service.CreateAsync(options);

      return Ok(new { clientSecret = paymentIntent.ClientSecret });
    }
  }

  public class CreatePaymentIntentRequest
  {
    public long Amount { get; set; }
  }
}
