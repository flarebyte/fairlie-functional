# Architecture decision records

An [architecture
decision](https://cloud.google.com/architecture/architecture-decision-records)
is a software design choice that evaluates:

-   a functional requirement (features).
-   a non-functional requirement (technologies, methodologies, libraries).

The purpose is to understand the reasons behind the current architecture, so
they can be carried-on or re-visited in the future.

## Image hero

> A Fairlie articulated steam locomotive with driving wheels on bogies
> crossing a wooden bridge over a river. The locomotive is black with red
> stripes and has a large smokestack. The bridge has wooden beams and
> railings. The river is blue and reflects the sky. In the background,
> there are snow-capped mountains in a Japanese manga style. The drawing
> is in black and white with high contrast and dynamic lines.

## Railtrack image

> A bird eye view of a railway track with just a few branches and
> junctions. The track is surrounded by grass and trees. The image is in
> black and white technical drawing architecture style

## Glossary

-   **Railway oriented programming**: A functional approach to the
    execution of functions sequentially, where each function can only
    return either a success or a failure. The success case leads to the
    next function, while the failure case bypasses the rest of the
    functions and goes to the error track.
-   **Result type**: A type that represents either a success value or a
    failure value. In F#, it is defined as `type Result<'TSuccess,'TFailure> = | Success of 'TSuccess | Failure of 'TFailure`.
-   **Switch function**: A function that has one input and a
    success/failure output. It can be seen as a railway switch that directs
    the input to either the success track or the failure track.
-   **Bind function**: A function that connects two switch functions
    together, passing the success output of the first function to the input
    of the second function, and propagating the failure output to the error
    track. In F#, it is defined as `let bind switchFunction input = match input with | Success s -> switchFunction s | Failure f -> Failure f`.
-   **Compose function**: A function that creates a new switch function by
    combining two switch functions using bind². In F#, it is defined as
    `let compose switchFunction1 switchFunction2 input = bind switchFunction2 (switchFunction1 input)`.
-   **Bypass function**: A function that allows a switch function to be
    skipped in case of a failure output from a previous function. In F#, it
    is defined as `let bypass switchFunction input = match input with | Success s -> Success s | Failure f -> switchFunction f`.
-   **Recover function**: A function that allows a failure output to be
    converted into a success output, thus moving from the error track to
    the success track. In F#, it is defined as `let recover recoveryFunction input = match input with | Success s -> Success s | Failure f -> recoveryFunction f`.

![Railtrack](/railtrack-512.jpeg)
