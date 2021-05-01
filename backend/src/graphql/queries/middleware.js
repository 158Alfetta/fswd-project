export const adminPermission = async (resolve, source, args, context, info) => {
  if (context?.user?.type === 'Admin') {
    return resolve(source, args, context, info)
  }
  throw new Error('You must be authorized')
}

export const authQueryMiddlewareWithFilter = async (
  resolve,
  source,
  args,
  context,
  info
) => {
  if (context?.user) {
    const newArgs = {
      ...args,
      filter: {
        ...args.filter,
        userId: context?.user._id,
      },
    }

    return resolve(source, newArgs, context, info)
  }
  throw new Error('You must be authorized')
}

export const authQueryMiddlewareWithFilterCreatedBy = async (
  resolve,
  source,
  args,
  context,
  info
) => {
  if (context?.user) {
    const newArgs = {
      ...args,
      filter: {
        ...args.filter,
        createdByUser: context?.user._id,
      },
    }

    return resolve(source, newArgs, context, info)
  }
  throw new Error('You must be authorized')
}

export const authQueryMiddlewareWithFilterOrderAdmin = async (
  resolve,
  source,
  args,
  context,
  info
) => {
  if (context?.user) {
    const newArgs = {
      ...args,
      filter: {
        ...args.filter,
        createdByUser: context?.user._id,
      },
    }

    return resolve(source, newArgs, context, info)
  }
  throw new Error('You must be authorized')
}
