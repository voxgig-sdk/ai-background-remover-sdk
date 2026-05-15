package core

type AiBackgroundRemoverError struct {
	IsAiBackgroundRemoverError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAiBackgroundRemoverError(code string, msg string, ctx *Context) *AiBackgroundRemoverError {
	return &AiBackgroundRemoverError{
		IsAiBackgroundRemoverError: true,
		Sdk:              "AiBackgroundRemover",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AiBackgroundRemoverError) Error() string {
	return e.Msg
}
