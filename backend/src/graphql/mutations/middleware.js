
export const authQueryMiddleware = async (
  resolve,
  source,
  args,
  context,
  info
) => {
  if (context?.user) {
    const newArgs = {
      ...args,
      createdById: context?.user._id,
    }

    return resolve(source, newArgs, context, info)
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
      createdById: context?.user._id,
      filter: {
        ...args.filter,
        userId: context?.user._id,
      },
    }

    return resolve(source, newArgs, context, info)
  }
  throw new Error('You must be authorized')
}