using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Business.src.Abstractions;
using WebApi.Business.src.Dtos;
using WebApi.Domain.src.Entities;

namespace WebApi.Controller.src.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]s")]
    public class OrderController : CrudController<Order, OrderReadDto, OrderCreateDto, OrderUpdateDto>
    {
        private readonly IOrderService _orderService;
        private readonly IAuthorizationService _authorizationService;
        public OrderController(IOrderService orderService, IAuthorizationService authorizationService) : base(orderService)
        {
            _orderService = orderService;
            _authorizationService = authorizationService;
        }

        [Authorize]
        public override async Task<ActionResult<OrderReadDto>> UpdateOneById([FromRoute] Guid id, [FromBody] OrderUpdateDto update)
        {
            var user = HttpContext.User;
            var order = await _orderService.GetOneById(id);
            var authorizeOwner = await _authorizationService.AuthorizeAsync(user, order, "OwnerOnly");
            if (authorizeOwner.Succeeded)
            {
                return await base.UpdateOneById(id, update);
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}