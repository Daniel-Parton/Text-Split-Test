using System;
using System.Collections.Generic;
using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using TextSplit.ApiContracts.Error;
using TextSplit.Domain.Shared.Extensions;

namespace TextSplit.Api.Filters
{
    public class UnhandledExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<UnhandledExceptionFilter> _logger;

        private Dictionary<Type, HttpStatusCode> _exceptionTypeStatusCodes = new Dictionary<Type, HttpStatusCode>
        {
            { typeof(ValidationException), HttpStatusCode.BadRequest },
            { typeof(UnauthorizedAccessException), HttpStatusCode.Unauthorized },
            { typeof(ApplicationException), HttpStatusCode.InternalServerError },
        };

        public UnhandledExceptionFilter(ILogger<UnhandledExceptionFilter> logger)
        {
            _logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            _logger.LogError(context.Exception.Message, context.Exception.StackTrace);

            var errorModel = new ErrorApiResponse();
            if (_exceptionTypeStatusCodes.ContainsKey(context.Exception.GetType()))
            {
                context.HttpContext.Response.StatusCode = (int)_exceptionTypeStatusCodes[context.Exception.GetType()];
                errorModel.Message = context.Exception.Message;
            }
            else
            {
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                errorModel.UnhandledException = true;
                errorModel.Message = "An Error has occured";
            }

            errorModel.Exception = context.Exception.GetDeepestMessage();
            context.Result = new ObjectResult(errorModel);
            context.ExceptionHandled = true;
        }


    }
}